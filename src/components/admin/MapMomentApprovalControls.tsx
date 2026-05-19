'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { Check, Loader2, X } from 'lucide-react'
import { useState } from 'react'

type ApprovalStatus = 'approved' | 'rejected'

const buttonBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  minHeight: 34,
  border: '1px solid transparent',
  borderRadius: 4,
  padding: '0 12px',
  cursor: 'pointer',
  font: 'inherit',
  fontSize: 13,
  fontWeight: 600,
}

export function MapMomentApprovalControls() {
  const { id, savedDocumentData, setData, updateSavedDocumentData } = useDocumentInfo()
  const [loadingStatus, setLoadingStatus] = useState<ApprovalStatus | null>(null)
  const [error, setError] = useState('')

  const currentStatus = savedDocumentData?.status

  if (!id) return null

  const updateStatus = async (status: ApprovalStatus) => {
    setLoadingStatus(status)
    setError('')

    try {
      const response = await fetch(`/api/map-moments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Status update failed')
      }

      const data = await response.json()
      setData(data.doc)
      updateSavedDocumentData(data.doc)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Status update failed')
    } finally {
      setLoadingStatus(null)
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap',
      marginBottom: 12,
      padding: 12,
      border: '1px solid var(--theme-elevation-150)',
      borderRadius: 6,
      background: 'var(--theme-elevation-50)',
    }}>
      <div style={{ display: 'grid', gap: 3, marginRight: 'auto' }}>
        <span style={{ color: 'var(--theme-elevation-500)', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Map moderation
        </span>
        <span style={{ width: 'fit-content', borderRadius: 999, padding: '3px 9px', background: 'var(--theme-elevation-150)', fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
          {String(currentStatus || 'unknown')}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          style={{ ...buttonBase, background: '#1f6b47', color: '#fff', opacity: loadingStatus !== null || currentStatus === 'approved' ? 0.55 : 1 }}
          disabled={loadingStatus !== null || currentStatus === 'approved'}
          onClick={() => updateStatus('approved')}
        >
          {loadingStatus === 'approved' ? <Loader2 size={16} /> : <Check size={16} />}
          Approve
        </button>
        <button
          type="button"
          style={{ ...buttonBase, borderColor: 'var(--theme-elevation-200)', background: 'var(--theme-bg)', color: 'var(--theme-text)', opacity: loadingStatus !== null || currentStatus === 'rejected' ? 0.55 : 1 }}
          disabled={loadingStatus !== null || currentStatus === 'rejected'}
          onClick={() => updateStatus('rejected')}
        >
          {loadingStatus === 'rejected' ? <Loader2 size={16} /> : <X size={16} />}
          Reject
        </button>
      </div>

      {error && <p style={{ width: '100%', margin: 0, color: 'var(--theme-error-600)', fontSize: 12 }}>{error}</p>}
    </div>
  )
}


