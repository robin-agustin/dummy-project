import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProjectItem from './ProjectItem'
import { fetchProjects, deleteProject } from '../actions'
import { Form, Container, Header, Divider, Transition, Table } from 'semantic-ui-react'
import AddProjectModal from './AddProjectModal'

class projectList extends React.Component{
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this)
  }

  static getInitialProps ({ store, isServer }) {
    store.dispatch(fetchProjects())
    return { isServer }
  }

  delete(id){
    this.props.deleteProject(id)
  }

  componentDidMount () {
    this.props.fetchProjects()
  }

  render() {
    const { projects } = this.props

      return (
          <Container text style={{ marginTop: '5em' }}>
          <Header floated='right'>
            <AddProjectModal />
          </Header>
          <Header as='h3' floated='left'>
            <Header.Content>
              Project List
            </Header.Content>
          </Header>
          <Divider clearing />
          <Form loading={!projects}>
          <Table color='black' selectable unstackable>
          <Table.Header>
          <Table.Row active>
          <Table.HeaderCell>TITLE</Table.HeaderCell>
          <Table.HeaderCell>CONTENT</Table.HeaderCell>
          <Table.HeaderCell>STATUS</Table.HeaderCell>
          <Table.HeaderCell textAlign='right'>ACTIONS</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
            <Transition.Group as={Table.Body}>
              {
              projects && projects.map((project) => (
              <ProjectItem key={project.id} project={project} deleteProject={this.delete}/>
              ))
              }
            </Transition.Group>
          </Table>
          </Form>
          </Container>
      ) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: bindActionCreators(fetchProjects, dispatch),
    deleteProject: bindActionCreators(deleteProject, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(projectList)