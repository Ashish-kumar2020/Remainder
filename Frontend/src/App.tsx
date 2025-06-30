import './App.css'
import CustomButton from './components/ui/CustomButton'
import {PlusCircleIcon} from "../src/assets/CreateIcon"
import { ShareIcon } from './assets/ShareIcon'
import CustomCard from './components/ui/CustomCard'
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


    <CustomCard
      title='Hi From Custom Card'
      imageURL='https://www.shutterstock.com/shutterstock/photos/2233924609/display_1500/stock-vector-short-and-custom-urls-url-shortener-technology-and-generator-scissor-cut-an-address-bar-or-link-2233924609.jpg'
      tag="Development"
      size="md"
      icon={<ShareIcon/>}
    />

</div>
     

    </>
  )
}

export default App
