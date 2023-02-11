export const postQuestions = async (ans)=>{
    const results = await fetch('http://localhost:4000/api/check-answers', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ans)
      })
    return await results.json()
}

export const getQuestions = async ()=>{
    const data = await fetch('http://localhost:4000/api/test/questions')
    return await data.json()
}