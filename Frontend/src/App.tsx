import './App.css'
import CustomButton from './components/ui/CustomButton'

function App() {
  

  return (
    <>
      <h1 className='text-2xl'>Brainly</h1>
      <CustomButton
        text="Delete"
        variant="primary"
        size="md"
        onClick={() => alert("Deleted")}
        tooltip="Danger action"
        rounded={true}
      />

     

    </>
  )
}

export default App
