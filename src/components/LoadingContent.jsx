import { Container,Row } from "react-bootstrap"

export const LoadingContent = ({message,content}) =>{
    return(
        <Container style={{paddingTop:'18rem',textAlign:'center'}}>
            <Row>
                <h1>{content}</h1>
            </Row>
            <Row>
                <h3>{message}</h3>
            </Row>
        </Container>
    )
}