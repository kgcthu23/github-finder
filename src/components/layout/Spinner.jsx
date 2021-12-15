import spinner from './assets/spinner.gif'

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img
        width={180}
        src={spinner}
        className='text-center mx-auto'
        alt='loading'
      />
    </div>
  )
}

export default Spinner
