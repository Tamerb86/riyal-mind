/**
 * مكتبة التشفير والأمان
 * لحماية البيانات الحساسة في قاعدة البيانات
 */

import crypto from "crypto"

// مفتاح التشفير (يجب أن يكون في متغيرات البيئة)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex")
const ALGORITHM = "aes-256-gcm"

/**
 * تشفير نص
 */
export function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(16)
    const key = Buffer.from(ENCRYPTION_KEY.slice(0, 64), "hex")
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    
    const authTag = cipher.getAuthTag()
    
    // نجمع IV + authTag + encrypted data
    return iv.toString("hex") + ":" + authTag.toString("hex") + ":" + encrypted
  } catch (error) {
    console.error("Encryption error:", error)
    throw new Error("Failed to encrypt data")
  }
}

/**
 * فك تشفير نص
 */
export function decrypt(encryptedText: string): string {
  try {
    const parts = encryptedText.split(":")
    if (parts.length !== 3) {
      throw new Error("Invalid encrypted data format")
    }
    
    const iv = Buffer.from(parts[0]!, "hex")
    const authTag = Buffer.from(parts[1]!, "hex")
    const encrypted = parts[2]!
    
    const key = Buffer.from(ENCRYPTION_KEY.slice(0, 64), "hex")
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)
    
    const decryptedBuffer = decipher.update(encrypted, "hex")
    const finalBuffer = decipher.final()
    const decrypted = Buffer.concat([decryptedBuffer, finalBuffer]).toString("utf8")
    
    return decrypted
  } catch (error) {
    console.error("Decryption error:", error)
    throw new Error("Failed to decrypt data")
  }
}

/**
 * تشفير أرقام البطاقات البنكية
 * يحفظ آخر 4 أرقام فقط بدون تشفير للعرض
 */
export function encryptCardNumber(cardNumber: string): {
  encrypted: string
  last4: string
} {
  const cleanNumber = cardNumber.replace(/\s/g, "")
  const last4 = cleanNumber.slice(-4)
  const encrypted = encrypt(cleanNumber)
  
  return { encrypted, last4 }
}

/**
 * Hash لكلمات المرور (استخدم bcrypt بدلاً من هذا)
 * هذا فقط للبيانات الأخرى التي تحتاج hash
 */
export function hashData(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex")
}

/**
 * توليد token عشوائي آمن
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString("hex")
}

/**
 * التحقق من HMAC signature
 */
export function verifyHMAC(data: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex")
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

/**
 * إنشاء HMAC signature
 */
export function createHMAC(data: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex")
}
