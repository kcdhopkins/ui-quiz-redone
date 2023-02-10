import React, { useEffect, useMemo, useRef, useState } from "react"
import './styles.css'
import ResultsView from "./ResultsView"
const App = () => {
    const [questions, setQuestions] = useState([])
    const [position, setPosition] = useState()
    const [cAnswers, setCanswers] = useState([])
    const [resultsView, setResultsView] = useState(false)
    const [results, setResults] = useState(false)
    const inputRef = useRef([])

    const formatQuestion = question => {
        return question.replace(/&quot;/g, "\"").replace(/&#039;/g, "'").replace(/&amp;/, '&').replace();
    }

    const handleMutipleChoice = ()=>{
        const {answers, question} = questions[position]
        inputRef.current = []
        return (<>
            <h3>{formatQuestion(question)}</h3>
            {answers.map((ans, index)=>{ 
                return <label className="d-block" key={`label-${index}`}>
                <input ref = {el=>inputRef.current[index] = el} className="m-2" type = "radio" name="answers" value={ans}/>
                <span>{ans}</span>
            </label>})}
        </>)
    }

    const handleText = ()=>{
        const {question} = questions[position]
        inputRef.current = []
        return(<>
            <h3>{formatQuestion(question)}</h3>
            <label className="d-block">
                <input ref={ el => inputRef.current[0] = el} className="m-2" type = "text" name="answers"/>
            </label>
        </>)
    }

    const questionComponent = useMemo(()=>{
        if(!questions.length || (questions.length - 1) < position) return <>Loading...</>
        if(questions[position].type !== 'text'){
            return handleMutipleChoice()
        }

        return handleText()
    }, [position])

    const fetchData = async ()=>{
        const data = await fetch('http://localhost:4000/api/test/questions')
        const result = await data.json()
        setQuestions(result)
    }

    const removeNullAndUncheckedFilter = ()=>{
        return inputRef.current.filter(input=> input !== null).filter((input)=>input.checked === true)
    }

    const handleSubmit = (el)=>{
        el.preventDefault()
        
        if(questions[position].type === 'text'){
            const ans = {
                question: questions[position].question,
                answer: inputRef.current[0].value
            }
            setCanswers([...cAnswers, ans])
            setPosition(prev => prev + 1)
            return
        }
        const [checked] = removeNullAndUncheckedFilter()
        const ans = {
            question: questions[position].question,
            answer: checked?.value || ''
        }
        if(checked?.checked) checked.checked = false
        setCanswers([...cAnswers, ans])
        setPosition(prev => prev + 1)
    }

    const submitQuestions = async ()=> {
        const results = await fetch('http://localhost:4000/api/check-answers', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(cAnswers)
          })
        const responseData = await results.json()
        setResults(responseData)
        setResultsView(true)
    }

    const resetView = () => {
        setCanswers([])
        setResultsView(false)
        setPosition(0)
    }

    useEffect(()=>{
        if((questions.length - 1) < position){
            submitQuestions()
        }
    }, [position])

    useEffect(()=>{
        if(questions.length){
            setPosition(0)
        }
    }, [questions])

    useEffect (()=>{
        fetchData()
    }, [])
    
    return (
    <div className="container-fluid">
        {resultsView && <ResultsView results = {results} resetView = {resetView}/>}
        {!resultsView && <form onSubmit={(el)=>handleSubmit(el)} className="d-flex justify-content-center">
            <div className="card w-25 mt-4">
                <div className="card-body ">
                    {questionComponent}
                    <div className="d-flex justify-content-center m-2">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </form>}
    </div>)
}

export default App