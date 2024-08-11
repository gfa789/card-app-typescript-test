import {useState, useContext, ChangeEvent, MouseEvent} from 'react'
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

export default function NewEntry(){
    const emptyEntry: Entry = {title: "", description: "",created_at: new Date(), scheduled_at: new Date()}
    const { saveEntry } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        saveEntry(newEntry)
        setNewEntry(emptyEntry)
    }
    return(
        <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 dark:bg-gray-600 bg-gray-300 dark:text-white p-8 rounded-md">
            <input className="p-3 rounded-md dark:bg-gray-900" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            <textarea className="p-3 rounded-md dark:bg-gray-900" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            <input className="p-3 rounded-md dark:bg-gray-900" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            <input className="p-3 rounded-md dark:bg-gray-900" type="date" name="scheduled_at" value={(new Date(newEntry.scheduled_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 :hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-400 font-semibold text-white p-3 rounded-md">Create</button>
        </section>
    )
}