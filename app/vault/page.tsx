'use client'

import { useState, useEffect, useRef } from 'react'
import { auth, db, storage } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import {
  FileText,
  Upload,
  Trash2,
  Download,
  ShieldCheck,
  Loader2,
  Lock,
  ChevronDown,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Document {
  id: string
  doc_type: string
  file_name: string
  file_path: string
  created_at: Timestamp
}

const DOC_TYPES = [
  { value: 'NID',           label: 'National ID (NID)',   color: 'bg-blue-50 text-blue-700' },
  { value: 'TIN',           label: 'TIN Certificate',     color: 'bg-amber-50 text-amber-700' },
  { value: 'TRADE_LICENSE', label: 'Trade License',       color: 'bg-emerald-50 text-emerald-700' },
  { value: 'PASSPORT',      label: 'Passport',            color: 'bg-indigo-50 text-indigo-700' },
  { value: 'MOA',           label: 'MoA / AoA',           color: 'bg-purple-50 text-purple-700' },
  { value: 'LEASE_AGREEMENT', label: 'Lease Agreement',   color: 'bg-rose-50 text-rose-700' },
  { value: 'PHOTO',         label: 'Passport Photo',      color: 'bg-sky-50 text-sky-700' },
]


export default function VaultPage() {
  const { language } = useLanguage()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [selectedType, setSelectedType] = useState('NID')
  const [dragOver, setDragOver] = useState(false)
  const router = useRouter()
  const urlCache = useRef<Record<string, string>>({})
  const docsUnsubRef = useRef<(() => void) | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const startDocs = (uid: string) => {
      const q = query(
        collection(db, 'documents'),
        where('user_id', '==', uid),
        orderBy('created_at', 'desc')
      )
      docsUnsubRef.current = onSnapshot(q, (snapshot) => {
        setDocuments(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Document)))
        setLoading(false)
      })
    }

    // Fast path: auth already resolved in this session (e.g. navigating from another page)
    if (auth.currentUser) {
      setUser(auth.currentUser)
      startDocs(auth.currentUser.uid)
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/auth')
        return
      }
      // Skip if fast path already handled this user
      if (auth.currentUser?.uid === firebaseUser.uid && docsUnsubRef.current) return
      setUser(firebaseUser)
      startDocs(firebaseUser.uid)
    })

    return () => {
      unsubscribeAuth()
      docsUnsubRef.current?.()
    }
  }, [router])

  const processFile = async (file: File) => {
    if (!user) return
    if (file.size > 5 * 1024 * 1024) { alert('File size exceeds 5MB limit.'); return }
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) { alert('Only PDF, JPG, and PNG are allowed.'); return }

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const safeExt = fileExt?.toLowerCase().match(/^[a-z0-9]+$/) ? fileExt : 'bin'
      const filePath = `vault/${user.uid}/${crypto.randomUUID()}.${safeExt}`
      await uploadBytes(ref(storage, filePath), file)
      await addDoc(collection(db, 'documents'), {
        user_id: user.uid,
        doc_type: selectedType,
        file_path: filePath,
        file_name: file.name,
        content_type: file.type,
        created_at: Timestamp.now(),
      })
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const handleDelete = async (document: Document) => {
    if (!confirm('Delete this document?')) return
    try {
      await deleteObject(ref(storage, document.file_path))
      await deleteDoc(doc(db, 'documents', document.id))
      delete urlCache.current[document.id]
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const handleDownload = async (document: Document) => {
    try {
      const cached = urlCache.current[document.id]
      const url = cached ?? await getDownloadURL(ref(storage, document.file_path))
      if (!cached) urlCache.current[document.id] = url
      const a = window.document.createElement('a')
      a.href = url
      a.download = document.file_name
      a.target = '_blank'
      a.click()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Download failed')
    }
  }

  const docTypeInfo = (value: string) =>
    DOC_TYPES.find((t) => t.value === value) ?? { label: value, color: 'bg-gray-100 text-gray-600' }

  const t = {
    en: {
      title: 'Document Vault',
      subtitle: 'Securely store and access your official documents.',
      uploadTitle: 'Upload Document',
      docType: 'Document Type',
      dropzone: 'Drop a file here, or click to browse',
      dropzoneHint: 'PDF, JPG, PNG · Max 5 MB',
      uploading: 'Uploading…',
      empty: 'Your vault is empty.',
      emptyHint: 'Upload your first document to get started.',
      uploaded: 'Added',
    },
    bn: {
      title: 'ডকুমেন্ট ভল্ট',
      subtitle: 'আপনার অফিসিয়াল কাগজপত্র সুরক্ষিতভাবে সংরক্ষণ ও অ্যাক্সেস করুন।',
      uploadTitle: 'ডকুমেন্ট আপলোড',
      docType: 'ডকুমেন্টের ধরণ',
      dropzone: 'ফাইল এখানে ড্রপ করুন বা ক্লিক করুন',
      dropzoneHint: 'PDF, JPG, PNG · সর্বোচ্চ ৫ MB',
      uploading: 'আপলোড হচ্ছে…',
      empty: 'আপনার ভল্ট খালি।',
      emptyHint: 'শুরু করতে প্রথম ডকুমেন্ট আপলোড করুন।',
      uploaded: 'যোগ করা হয়েছে',
    },
  }[language]

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-16">
        <Header />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="h-20 bg-white rounded-2xl ring-1 ring-black/8 animate-pulse" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="h-72 bg-white rounded-2xl ring-1 ring-black/8 animate-pulse" />
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-white rounded-2xl ring-1 ring-black/8 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
              <Lock className="w-7 h-7 text-primary" />
              {t.title}
            </h1>
            <p className="text-sm text-gray-500">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2.5 bg-white rounded-xl ring-1 ring-black/8 shadow-sm px-4 py-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Signed in as</p>
              <p className="text-sm font-medium text-gray-800 leading-none mt-0.5">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Upload panel */}
          <div className="bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-6 space-y-5 h-fit">
            <h2 className="text-base font-semibold text-gray-900">{t.uploadTitle}</h2>

            {/* Doc type selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500">{t.docType}</label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-10 pl-3 pr-8 rounded-xl ring-1 ring-black/10 bg-white text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer"
                >
                  {DOC_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-2 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              {uploading ? (
                <Loader2 className="w-7 h-7 text-primary animate-spin" />
              ) : (
                <Upload className={`w-7 h-7 transition-colors ${dragOver ? 'text-primary' : 'text-gray-300'}`} />
              )}
              <p className="text-sm font-medium text-gray-600 text-center">
                {uploading ? t.uploading : t.dropzone}
              </p>
              <p className="text-xs text-gray-400">{t.dropzoneHint}</p>
            </div>
          </div>

          {/* Document grid */}
          <div className="lg:col-span-2">
            {documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 bg-white rounded-2xl ring-1 ring-black/8 shadow-sm p-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 ring-1 ring-black/8 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-gray-300" />
                </div>
                <p className="font-semibold text-gray-900">{t.empty}</p>
                <p className="text-sm text-gray-400">{t.emptyHint}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {documents.map((document) => {
                  const info = docTypeInfo(document.doc_type)
                  return (
                    <div
                      key={document.id}
                      className="group bg-white rounded-2xl ring-1 ring-black/8 shadow-sm hover:shadow-md hover:ring-black/12 transition-all duration-200 p-5 flex flex-col gap-4"
                    >
                      <div className="flex items-start justify-between">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${info.color}`}>
                          {info.label}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <button
                            onClick={() => handleDownload(document)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(document)}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 ring-1 ring-black/8 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate" title={document.file_name}>
                            {document.file_name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {t.uploaded} {document.created_at?.toDate().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
