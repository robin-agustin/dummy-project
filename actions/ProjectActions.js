import { loadDB } from '../lib/db'
import {
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECTS,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  LOADING
}
from './types'

export const addProject = (project) => async dispatch => {
  const db = await loadDB();

  dispatch({
    type: LOADING
  })
  db.firestore().collection('projects1')
      .add({
        ...project,
        status: 'ongoing',
        timestamp: new Date()
      })
      .then(() => {
        dispatch({
          type: ADD_PROJECT_SUCCESS
        })
      })
      .catch((error) => {
        console.error("Error adding document: ", error)
        dispatch({
          type: ADD_PROJECT_FAILURE
        })
      })
}

export const updateProject = (project, id) => async dispatch => {
      const db = await loadDB();

    dispatch({
      type: LOADING
    })
    db.firestore().collection('projects1').doc(id).set({
        ...project,
        title: project.title,
        content: project.content,
        status: project.status,
        timestamp: project.timestamp
    })
    .then(() => {
        dispatch({
          type: UPDATE_PROJECT_SUCCESS, project})
    })
    .catch((err) => {
        dispatch({
          type: UPDATE_PROJECT_FAILURE, err})
    })
}

export const deleteProject = (id) => async dispatch => {
      const db = await loadDB();

      db.firestore().collection('projects1').doc(id).delete()
      .then(() => {
          dispatch({
            type: DELETE_PROJECT_SUCCESS
          })
      })
      .catch((error) => {
      console.error("delete error: ", error)
      });
};

export const fetchProjects = () => async dispatch => {
  const db = await loadDB();

  db.firestore().collection('projects1')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .onSnapshot(snapshot => {

        let newState = {
          projects: []
        };

        snapshot.forEach(function(doc) {
          newState.projects.push({
            id: doc.id,
            content: doc.data().content,
            title: doc.data().title,
            status: doc.data().status,
            timestamp: doc.data().timestamp
          });
        });

        dispatch({
          type: FETCH_PROJECTS,
          payload: newState
        })
      });
};

