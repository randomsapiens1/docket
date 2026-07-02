import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

function initAdmin() {
  if (getApps().length > 0) return getApps()[0]

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY env var is not set')

  const serviceAccount = JSON.parse(raw)

  return initializeApp({
    credential: cert(serviceAccount),
  })
}

const app = initAdmin()

export const adminAuth = getAuth(app)
export const adminDb = getFirestore(app)
