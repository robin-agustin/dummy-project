import Layout from '../components/Layout'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import ProjectList from '../components/ProjectList'

class Projects extends React.Component {
  render () {
    return (
        <Layout>
            <ProjectList />
        </Layout>
    )
  }
}

export default withRedux(initStore, null, null)(Projects)