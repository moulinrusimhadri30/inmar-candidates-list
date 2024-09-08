import { useEffect, useState } from 'react'
import './App.css'
import { axiosInstance } from './data/axiosInstance'
import CardBox from './components/Card'
import { Col, Container, Row,Button, Image } from 'react-bootstrap'
import '@smastrom/react-rating/style.css'
import logo from "./assets/logo.png"
import { LoadingContent } from './components/LoadingContent'

function App() {
  const [profiles,setProfile] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [isError,setIsError] = useState(false)

  const fetchApi = async () => {
    try{
        const response = await axiosInstance.get('photos')
        setProfile(response.data)
        // setProfile(mockData)
        setIsLoading(false)
    }catch(err){
        console.log(err)
        setIsError(err)
        setIsLoading(false)
    }
}

  useEffect(()=>{
    fetchApi()
  },[])

  const styleObject = {
    border:'5px solid black',
    backgroundColor:'#ecf0fb',
    borderRadius:'20px',
    padding:'auto',
    height:'53rem',
    overflowY: 'auto',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none'
  };

  return (
    <>
      <Container  fluid="sm" className='mt-3'> 
        <Row>
          <Col lg={4} style={styleObject}>
            {isLoading ? <LoadingContent content="Loading..." message="Fetching Api data"/>
              : isError ? <Col>
                            <LoadingContent content="Loading Failure" message={isError.message} />
                          </Col> : (
              profiles && profiles.map((profile)=>( 
                <Row key={profile.id} >            
                  <Col className='m-4 px-4'>
                    <CardBox profile={profile} />
                  </Col>  
                </Row>             
              ))
            )}
          </Col> 
          <Col style={{marginLeft:'13rem'}}>
            <Image src={logo} fluid style={{position:'fixed', marginTop:'15rem'}}/>
            <h1 style={{marginTop:'27rem',marginLeft:'8rem',color:'white',position:'fixed'}}>Candidates List</h1>
          </Col>
        </Row>
     </Container>
    </>
  )
}

export default App
