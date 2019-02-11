import { Button, Table, Popup } from 'semantic-ui-react'
import _ from 'lodash'
import UpdateProjectModal from './UpdateProjectModal'

const projectItem = (props) => {
  const {project, deleteProject } = props

  return (
  <Table.Row>
    <Table.Cell>{_.capitalize(project.title)}</Table.Cell>
    <Table.Cell>{_.capitalize(project.content)}</Table.Cell>
    <Table.Cell>{_.capitalize(project.status)}</Table.Cell>
    <Table.Cell textAlign='right'>       
      <Popup
        trigger={<Button 
                  size='mini' 
                  floated='right' 
                  circular 
                  color='red' 
                  icon='delete' />}
        content={<Button 
                  onClick={deleteProject.bind(this, project.id)} 
                  icon='warning sign' 
                  size='medium' 
                  color='yellow' 
                  content='Delete?' />}
        on='click'
        hideOnScroll
        position='right center' />
      <UpdateProjectModal project={project} />
      </Table.Cell>
    </Table.Row>
  )
}

export default projectItem