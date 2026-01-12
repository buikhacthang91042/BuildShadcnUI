import { Role, RoleResponse } from '@/features/users/data/schema'

const BASE_URL = 'https://eco-app-gateway-dev.smartlogvn.com/trans/api'
const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4RkJGNTMxNTY5MDRCMTg2MkVCQkYxMzI4OEMwRjFCOTFDREIwQkVSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IktQdjFNVmFRU3hoaTY3OFRLSXdQRzVITnNMNCJ9.eyJuYmYiOjE3Njc1ODcxMzMsImV4cCI6MTc2ODQ1MTEzMywiaXNzIjoiaHR0cHM6Ly9zbWFydGxvZy1hdXRoLWJlLWRldi5zbWFydGxvZ3ZuLmNvbSIsImF1ZCI6IkF1dGgiLCJjbGllbnRfaWQiOiJTVFhfQXBwIiwic3ViIjoiM2EwZDA1NjEtMjMxYi1jN2NlLTRkOTEtZDc2MDJjNmUzMjI3IiwiYXV0aF90aW1lIjoxNzY3NTg3MTMxLCJpZHAiOiJsb2NhbCIsInRlbmFudGlkIjoiM2EwYzg2NmMtY2NlOS0yMWM1LWE0OTgtMTQyYmFiZTY0Mzc2IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6InRoYW5nLmJ1aUBnb3NtYXJ0bG9nLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjoiRmFsc2UiLCJuYW1lIjoidGhhbmcuYnVpQGdvc21hcnRsb2cuY29tIiwic2lkIjoiNDE0MzI1NzlGNjY3RUE5NTBEQjA1MTY0QUQ2MjAzN0UiLCJpYXQiOjE3Njc1ODcxMzMsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsImFkZHJlc3MiLCJwaG9uZSIsInJvbGUiLCJBdXRoIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.bhztUQGVF_ykia333TS-BCGVb-0-S0CzGrU5TZLOGQZOZ1hZHfr_yQH42tKu82dMcjofvXKi94ksNR9hkfivVRplaLDpCYRya99bqQaAIhaC_vutf-vs0hgFOf_22AA8dePKu_pWq0aQDOtewo2903NVVcu4aFcp2X6do2HxT3iGfZcG3k2J9Cv7s1wvjdq-oiIQvSdc2CrXBaKJvScJ40KQiyx2VswWamw06zCDqum7N-7shRxjXh-HjWxIWkn9GvK9-yHzO_LGDvyW13VZRQ_hphGy8HnAKREoyalbwjAmTOFF8OSEG7hvTEHR4KvXALlpkTcHB7z2M5lBFmMqu7osWOcTnRcslNWNnfEIR68RyGIOibyLf1GTc5u37_laHqJ6WMNRaU-xUqmB0olFgBt23Uk9pyP4XINxzD-664TgHMePtLT8tfWQmZjKHFAez4YfHGkSxRSSUMhDZ9KkrTmV2Zr2bpDtAxgJ5q7l3xnw4JA4o1rNvMxyR_EYpMP_meKP7Et7VgXggrJbtMSpb3u_Qic4W6wh_8I1PAcV1xsH9eLUtc_sewFWpBIITey1LKp6Oq0dnGrRR4BmjM6fOFpr7zFZqcRJeaNFPqtX04_kXYAG86VmZn028sIxZynuP82EDFzRBRU6cOioflnavqviokkGZCHziobVV9zBn9Y'

export async function getRoleName(
  pageIndex: number,
  pageSize: number,
  name = ''
): Promise<RoleResponse> {
  const params = new URLSearchParams({
    name,
    pageIndex: String(pageIndex),
    pageSize: String(pageSize),
  })
  try {
    const res = await fetch(`${BASE_URL}/auth/roles?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Unauthorized')
      }
      throw new Error('Failed to fetch container data')
    }
    return res.json()
  } catch (error) {
    console.error('Lỗi fetchAPI GETROLENAME')
    throw error
  }
}

export async function createRole(name: string) {
  const res = await fetch(`${BASE_URL}/auth/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Failed to create role')
  }

  return res.json()
}

export async function deleteRoleById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/auth/roles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized')
      if (res.status === 404) throw new Error('Role not found')
      throw new Error('Delete role failed')
    }
    return true
  } catch (error) {
    console.error('Lỗi DELETE ROLE:', error)
    throw error
  }
}

export async function updateRoleName(id: string, name: string) {
  const res = await fetch(`${BASE_URL}/auth/roles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Failed to update role')
  }

  return res.json()
}

export async function getPermissionsByRole(roleId: string) {
  const params = new URLSearchParams({
    providerName: 'R',
    providerKey: roleId,
  })

  const res = await fetch(`${BASE_URL}/auth/permissions?${params.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized')
    }
    throw new Error('Failed to fetch permissions')
  }

  return res.json()
}
