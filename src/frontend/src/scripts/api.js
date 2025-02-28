const base_url = "http://localhost:5500"
// const base_url = "https://trace.ivylh03.net"

export async function getAllThoughts () {
    const res = await fetch(base_url + '/thought/get/all')
    const data = await res.json()
    return data
}

export async function postThought (content) {
  const res = await fetch(base_url + '/thought/post', {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: content
    })
  })

  const data = await res.json()

  return data
}

export async function deleteThought (thoughtId) {
  const res = await fetch(base_url + '/thought/' + thoughtId, {
    method: "DELETE"
  })



  if(res.ok) {
    return true
  }
  return false
}
