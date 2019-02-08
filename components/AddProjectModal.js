import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addProject } from '../actions'
import { Button, Header, Icon, Modal, Form, TransitionablePortal, Label, FormField } from 'semantic-ui-react'

class AddProject extends React.Component {

  state = {
    project:{
        title: '',
        content: '',
    },
    showModal: false,
    titleError: false,
    contentError: false
}

  addNewProject () {
    let error = false
    
    if (this.state.project.title.trim() == "")  {
      this.setState({ titleError: true })
      error = true
    }

    if (this.state.project.content.trim() == "")  {
      this.setState({ contentError: true })
      error = true
    }

    if (!error) {
      this.props.addProject(this.state.project)
      this.closeModal()
    }
  }

  handleChange = (e) => {
    let inputID = e.target.id;
    let inputValue = e.target.value;
  
    let statusCopy = {...this.state}
    statusCopy.project[inputID] = inputValue;
  
    this.setState(statusCopy)
  }

  clearState () {
    this.setState({ project: { ...this.state.project, title: '', content: ''} })
  }

  handleClick = () => {
    this.setState({ showModal: true, titleError: false, contentError: false })
    this.clearState()
  }

  clearErrors = () => { this.setState({ titleError: false, contentError: false }) }
  
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { loading } = this.props

    return(
      <div>
      <Button onClick={this.handleClick} color='blue'>Add New Project</Button>
      <TransitionablePortal open={this.state.showModal} transition={{ animation:'scale', duration: 300 }}>
      <Modal size='tiny' open={this.state.showModal} onClose={this.closeModal} closeIcon>
        <Header content='Add New Project' />
          <Modal.Content>
            <Form >
              <Form.Field>
              <Form.Input
                onClick={this.clearErrors}
                defaultValue='' 
                id="title" label='Title' 
                placeholder='Title...' 
                fluid 
                onChange={this.handleChange.bind(this)} />
                {this.state.titleError && <Label pointing >Title cannot be empty!</Label>}
              </Form.Field>
              <Form.Field>
              <Form.TextArea
                onClick={this.clearErrors}
                defaultValue='' 
                label='Content' 
                id="content" 
                placeholder='Content...' 
                style={{ minHeight: 100 }} 
                onChange={this.handleChange.bind(this)} />
                {this.state.contentError && <Label pointing >Content cannot be empty!</Label>}
              </Form.Field>
            </Form>
          </Modal.Content>
        <Modal.Actions>
            <Button disabled={loading} onClick={this.closeModal} >
              <Icon name='remove' /> Cancel
            </Button>
            <Button 
              disabled={loading} 
              onClick={this.addNewProject.bind(this)} 
              color='blue'
              disabled={!this.state.project.title || !this.state.project.content}
              >
              <Icon name='checkmark' /> Add
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