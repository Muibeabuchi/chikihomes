import spinner from '../../assets/spinner.svg';

function Spinner() {
  return (
    <div className='flex items-center justify-center fixed left-0 right-0 top-0 bottom-0 z-[20] bg-black bg-opacity-50 '>
        <div className="">
            <img src={spinner} alt="spinner logo" className='h-24'/>
        </div>
    </div>
  )
}

export default Spinner