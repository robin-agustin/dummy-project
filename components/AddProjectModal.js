import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addProject } from '../actions'
import { Button, Header, Icon, Modal, Form, TransitionablePortal } from 'semantic-ui-react'

class AddProject extends React.Component {

  state = {
    project:{
        title: '',
        content: '',
    },
    showModal: false
}

  addNewProject () {
    this.props.addProject(this.state.project)
    this.closeModal()
  }

  handleChange = (e) => {
    let inputID = e.target.id;
    let inputValue = e.target.value;
  
    let statusCopy = {...this.state}
    statusCopy.project[inputID] = inputValue;
  
    this.setState(statusCopy)
  }

  clearState () {
    this.setState({ project: { ...this.state.project, title: '', content: ''} });
  }

  handleClick = () => {
    this.setState({ showModal: true })
    this.clearState()
  }
  
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { openProject, loading } = this.props
    
    return(
      <div>
      <Button onClick={this.handleClick} color='blue'>Add New Project</Button>
      <TransitionablePortal open={this.state.showModal} transition={{ animation:'scale', duration: 300 }}>
      <Modal size='tiny' open={this.state.showModal} onClose={this.closeModal} closeIcon>
        <Header content='Add New Project' />
          <Modal.Content>
            <Form >
            <Form.Input defaultValue='' id="title" label='Title' placeholder='Title...' fluid onChange={this.handleChange.bind(this)} />
            <Form.TextArea defaultValue='' label='Content' id="content" placeholder='Content...' style={{ minHeight: 100 }} onChange={this.handleChange.bind(this)} />
            </Form>
          </Modal.Content>
        <Modal.Actions>
            <Button disabled={loading} onClick={this.closeModal} >
              <Icon name='remove' /> Cancel
            </Button>
            <Button disabled={loading} onClick={this.addNewProject.bind(this)} color='blue'>
              <Icon  name='checkmark' /> Add
          </Button>
        </Modal.Actions>
      </Modal>
      </TransitionablePortal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: bindActionCreators(addProject, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(AddProject)