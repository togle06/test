import { configureStore, createSlice } from '@reduxjs/toolkit'
let user = createSlice({
  name : 'user',
  initialState : {id : []},
  reducers : {        
    changeid(state,action){
      console.log('userid',action.payload.data);
      return action.payload;
    }
  }
})
export let {changeid} = user.actions   //수정
//////////////////////////////////////////////////

let Fuser = createSlice({
  name : 'Fuser',
  initialState : {userid : ''},
  reducers : {        
    Fuserid(state,action){
      console.log('Fuser',action.payload.userid);

       return  action.payload.userid ;
    }
  }
})
export let {Fuserid} = Fuser.actions   //수정
//////////////////////////////////////////////////

let control = createSlice({
  name : 'control',
  initialState : [],
  reducers : {        //수정할때
      controlid(state,rdata){
      //  const value1 = rdata.payload
    //   const newItem   = rdata.payload
    //  // const randomId = randomString(10);
    //   state.items.push({
    //     id : newItem.id,
    //     description : newItem.description
    //   }) 
       console.log('control',rdata)
      return rdata;
    },
    // controlDelete(state,rdata){
    //   //  const value1 = rdata.payload
    //   console.log('alee',rdata)
    //   const id  = rdata.payload
    //    return state.state.filter(id => state.id !== id)
    //   // return value1
    // }

    
    controlDelete(state,rdata){
      console.log('deleteItem')
      // let result = [...state].filter(function(a){
      //   return a.id != rdata.payload;
      // });
  
      // return result
      
    }   
  }
})


export let {controlid,controlDelete} = control.actions   //수정

// let initialState: UserListInterface[] = [
//   {
//     id: '',
//     socketId: '',
//   },
// ];


const initialState = { 
  items: [] ,
  status : 'idle',
  error: null
}

let group = createSlice({
  name : 'group',
  initialState ,
  reducers : {        //수정할때
    addGropup(state, action) {
      state.items(action);
    }, 
    removeGroup(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.value !== id);
    },   
    
    // changeCgroup(state,rdata){
    //   const value = rdata.payload
    //   console.log("rdata.payload",rdata.payload)
    //    state.group = value
    // }

  }
})

export let {addGropup,removeGroup } = group.actions  


export default configureStore({
  reducer: {
      user : user.reducer,
      group : group.reducer,
      control : control.reducer,
      Fuser : Fuser.reducer      
   }
}) 

