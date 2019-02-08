import Layout from '../components/Layout'
import { Container } from 'semantic-ui-react'

class Index extends React.Component {
    render () {
        return (
            <Layout>
                <Container text style={{ marginTop: '5em' }}>
                    <p>index page</p>
                </Container>
            </Layout>
        )
    }
}

export default Index