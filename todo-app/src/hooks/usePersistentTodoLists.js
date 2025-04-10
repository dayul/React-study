import { useEffect } from 'react'
import { useImmer } from 'use-immer'

// custom hook에는 기본 hook을 활용해서 만듦
export function usePersistentTodoLists() {
    const [todoLists, setTodoLists] = useImmer(() => {
        const savedLists = localStorage.getItem('todoLists')
        return savedLists ? JSON.parse(savedLists) : []
    });
    
    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(todoLists))
    }, [todoLists])
    
    return [todoLists, setTodoLists];
}