import React, { useState,useEffect } from 'react'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {setData} from "./store/store";

function App() {
  const data = useSelector(state => state.data)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadData = async () => {
      const postId = Math.floor(Math.random() * 100)
      const dataRaw = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
      if (!dataRaw.ok) {
        dispatch(setData('Ошибка загрузки'))
        return
      }
      const dataJson = await dataRaw.json()
      dispatch(setData(dataJson.body))
    }

    loadData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {!data &&
        <p>
          ...подождите...
        </p>
        }
        {data &&
        <p>
          {data}
        </p>
        }
      </header>
    </div>
  )
}

export default App
