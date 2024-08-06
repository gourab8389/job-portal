import { useEffect, useState } from "react"

export const useDebounce = <T>(value : T, delay : number = 500) : T => {
	const [debouceValue, setDebounceValue] = useState<T>(value)
	
	useEffect(()=> {
        const handler = setTimeout(()=>{
            setDebounceValue(value)
        },delay)

        return () => {
            clearTimeout(handler)
        }
    },[value, delay])
    return debouceValue;
}