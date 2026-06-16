'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useLanguage } from '@/lib/language-context'
import { 
  FileText, 
  Upload, 
  Trash2, 
  Download, 
  Plus, 
  ShieldCheck, 
  AlertCircle,
  Loader2,
  FileBadge
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Document {
  id: string
  doc_type: string
  file_name: string
  file_path: string
  created_at: string
}

const DOC_TYPES = [
  { value: 'NID', label: 'National ID (NID)' },
  { value: 'TIN', label: 'TIN Certificate' },
  { value: 'TRADE_LICENSE', label: 'Trade License' },
  { value: 'PASSPORT', label: 'Passport' },
  { value: 'MOA', label: 'MoA / AoA' },
  { value: 'LEASE_AGREEMENT', label: 'Lease Agreement' },
  { value: 'PHOTO', label: 'Passport Photo' }
]

export default function VaultPage() {
  const { language } = useLanguage()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [selectedType, setSelectedType] = useState('NID')
  const supabase = createClient()
  const router = useRouter()

  const fetchDocuments = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching documents:', error)
    } else {
      setDocuments(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
      } else {
        setUser(session.user)
        fetchDocuments(session.user.id)
      }
    }
    checkUser()
  }, [supabase, router, fetchDocuments])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    // Security Check: Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.')
      return
    }

    // Security Check: Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only PDF, JPG, and PNG are allowed.')
      return
    }

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      // Security Check: Sanitize file extension
      const safeExt = fileExt?.toLowerCase().match(/^[a-z0-9]+$/) ? fileExt : 'bin'
      const fileName = `${crypto.randomUUID()}.${safeExt}`
      const filePath = `${user.id}/${fileName}`

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('vault')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Insert Metadata
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          doc_type: selectedType,
          file_path: filePath,
          file_name: file.name,
          content_type: file.type
        })

      if (dbError) throw dbError

      fetchDocuments()
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert('An unexpected error occurred')
      }
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (doc: Document) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      // 1. Delete from Storage
      await supabase.storage.from('vault').remove([doc.file_path])
      // 2. Delete from DB
      await supabase.from('documents').delete().eq('id', doc.id)
      
      fetchDocuments(user.id)
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert('An unexpected error occurred')
      }
    }
  }

  const handleDownload = async (doc: Document) => {
    const { data, error } = await supabase.storage
      .from('vault')
      .download(doc.file_path)
    
    if (error) {
      alert(error.message)
      return
    }

    const url = URL.createObjectURL(data)
    const a = document.createElement('a')
    a.href = url
    a.download = doc.file_name
    a.click()
  }

  const t = {
    en: {
      title: "My Document Vault",
      subtitle: "Securely store and manage your official documents.",
      uploadTitle: "Upload New Document",
      docType: "Document Type",
      empty: "Your vault is empty. Upload your first document to get started.",
      uploading: "Uploading...",
      uploaded: "Uploaded on",
      actions: "Actions"
    },
    bn: {
      title: "আমার ডকুমেন্ট ভল্ট",
      subtitle: "আপনার অফিসিয়াল কাগজপত্র সুরক্ষিতভাবে সংরক্ষণ ও পরিচালনা করুন।",
      uploadTitle: "নতুন ডকুমেন্ট আপলোড করুন",
      docType: "ডকুমেন্টের ধরণ",
      empty: "আপনার ভল্ট খালি। শুরু করতে আপনার প্রথম ডকুমেন্ট আপলোড করুন।",
      uploading: "আপলোড হচ্ছে...",
      uploaded: "আপলোড করা হয়েছে",
      actions: "অ্যাকশন"
    }
  }[language]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f2f1]">
        <Loader2 className="w-12 h-12 animate-spin text-[#ff0000]" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f3f2f1] pt-16">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-10">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-[3px] border-black pb-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-black flex items-center gap-3">
                <FileBadge className="w-10 h-10 text-[#ff0000]" />
                {t.title}
              </h1>
              <p className="text-lg font-bold text-gray-500 uppercase tracking-wide">
                {t.subtitle}
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white border-2 border-black p-4">
              <div className="p-2 bg-green-50 rounded-full">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400">Secure Storage</p>
                <p className="text-sm font-bold text-black">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Upload Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border-[3px] border-black p-6 space-y-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#ff0000]" />
                  {t.uploadTitle}
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-500">{t.docType}</label>
                    <select 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full h-12 px-4 border-2 border-black font-bold focus:bg-gray-50 outline-none appearance-none cursor-pointer rounded-none"
                    >
                      {DOC_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative group">
                    <input 
                      type="file" 
                      onChange={handleUpload}
                      disabled={uploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-black p-8 text-center space-y-3 group-hover:bg-gray-50 transition-colors">
                      {uploading ? (
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#ff0000]" />
                      ) : (
                        <Upload className="w-8 h-8 mx-auto text-gray-400 group-hover:text-black transition-colors" />
                      )}
                      <p className="text-sm font-bold text-gray-600">
                        {uploading ? t.uploading : "Drop file or click to upload"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-[10px] leading-relaxed text-blue-800 font-medium">
                    Allowed formats: PDF, JPG, PNG. Max size: 5MB. All files are encrypted at rest.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Grid */}
            <div className="lg:col-span-2">
              {documents.length === 0 ? (
                <div className="bg-white border-[3px] border-black border-dashed p-20 text-center space-y-4">
                  <FileText className="w-16 h-16 mx-auto text-gray-200" />
                  <p className="text-xl font-bold text-gray-400">{t.empty}</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-white border-[3px] border-black p-6 space-y-4 hover:translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-start justify-between">
                        <div className="p-3 bg-gray-50 border-2 border-black">
                          <FileText className="w-6 h-6 text-[#ff0000]" />
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleDownload(doc)}
                            className="p-2 hover:bg-gray-100 border border-transparent hover:border-black transition-all"
                            title="Download"
                          >
                            <Download className="w-5 h-5 text-gray-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(doc)}
                            className="p-2 hover:bg-red-50 border border-transparent hover:border-black transition-all group"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5">
                          {doc.doc_type}
                        </span>
                        <h3 className="font-black text-black truncate pr-4" title={doc.file_name}>
                          {doc.file_name}
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                          {t.uploaded} {new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
