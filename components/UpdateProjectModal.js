import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateProject } from '../actions'
import { Button, Header, Icon, Modal, Form, TransitionablePortal } from 'semantic-ui-react'

class UpdateProject extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          project:{
              title: props.project.title,
              content: props.project.content,
              status: props.project.status,
              timestamp: props.project.timestamp,
          },
          showModal: false
      }
    }

  update() { 
    this.props.updateProject(this.state.project, this.props.project.id) 
    this.closeModal()
  }

  handleChange = (e) => {
    let inputID = e.target.id;
    let inputValue = e.target.value;
  
    let statusCopy = {...this.state}
    statusCopy.project[inputID] = inputValue;
  
    this.setState(statusCopy)
  }

  handleDropdown = (e, data) => {
    this.setState({ project: { ...this.state.project, status: data.value} });
  }

  handleClick = () => {
    this.setState({ showModal: true })
  }
  
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { loading } = this.props
    const { title, content, status }  = this.state.project
    
        const options = [
            {value:'ongoing', text:'Ongoing'},
            {value:'completed', text:'Completed'},
            {value:'terminated', text:'Terminated'},
          ]

    return(
      <React.Fragment>
      <Button onClick={this.handleClick} size='mini' floated='right' circular color='blue' icon='compose' /> 
      <TransitionablePortal open={this.state.showModal} transition={{ animation:'scale', duration: 300 }}> 
      <Modal open={this.state.showModal} size='tiny' onClose={this.closeModal} closeIcon>
        <Header content='Project Details' />
          <Modal.Content>
            <Form>
            <Form.Dropdown
              label='Status'
              id='status'
              placeholder="Select Options"
              defaultValue={status}
              fluid selection
              options={options}
              onChange={this.handleDropdown}
              />
            <Form.Input value={title} id="title" label='Title' placeholder='Title...' fluid onChange={this.handleChange.bind(this)} />
            <Form.TextArea value={content} label='Content' id="content" placeholder='Content...' style={{ minHeight: 100 }} onChange={this.handleChange.bind(this)} />
            </Form>
          </Modal.Content>
        <Modal.Actions>
            <Button disabled={loading} onClick={this.closeModal} >
              <Icon name='remove' /> Cancel
            </Button>
            <Button disabled={loading} onClick={this.update.bind(this)} color='blue'>
              <Icon  name='checkmark' /> Update
          </Button>
        </Modal.Actions>
      </Modal>
      </TransitionablePortal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProject: bindActionCreators(updateProject, dispatch)
  }
}

export default connect(state => state, mapDispatchToProps)(UpdateProject)