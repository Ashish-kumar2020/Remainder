import './App.css'
import CustomButton from './components/ui/CustomButton'
import {PlusCircleIcon} from "../src/assets/CreateIcon"

function App() {
  

  return (
    <>
      <h1 className='text-2xl'>Brainly</h1>
     
<div className='pl-[30px]'>
    <CustomButton
      text='Add Content'
      variant="primary"
      size='xs'
      onClick={()=>alert("Custom Button Clicked")}
      icon={<PlusCircleIcon/>}
     
    />

</div>
     

    </>
  )
}

export default App
