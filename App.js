import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'


const App = () => {

  const [todo, settodo] = useState();
  const [data, setdata] = useState([]);


  const addTodoFunc = () => {
    setdata(oldtodos => ([...oldtodos, {
      id: data.length + 1,
      todo: todo,
      finished: false
    }]))
    settodo(null)
  }

  const deleteFunc = (id) => {
    setdata((data) =>
      [...data].filter((item) => item.id !== id)
    )
  }

  const checkFunc = (id) => {
     let updatedata = data.map((item) => {
       if(item.id === id){
         item.finished = !item.finished
       }
       return item;
     })
     setdata(updatedata)
  }
  const alldone = () => {
    setdata((data) => 
       [...data].filter((item) => item.finished = true )
    )
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.ListView} key = {item.id} >
        <View style={styles.ListItem} >
          <Text style={styles.ItemText} >
            {item.todo}
          </Text>
        </View>
        <View style={styles.ItemIcons} >
          <TouchableOpacity onPress = {() => checkFunc(item.id) } >
           {
             item.finished ? 
             <Icon name = 'checkcircle' size={20} style = {{marginRight: 15}} /> : 
             <Entypo name='circle' size={20} color='black' style={{ marginRight: 15 }} />
           }
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteFunc(item.id)}>
            <Icon name='delete' size={25} color='black' style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.Container} >
      <View style={styles.InputView} >
        <TextInput
          style={styles.TodoInput}
          value={todo}
          onChangeText={text => settodo(text)}
          placeholder='Todo'
        />
        <View style={styles.AddIconView} >
          <TouchableOpacity onPress={() => addTodoFunc()} >
            <Icon name='addfile' color='black' size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style = {{flex:1}} >
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style = {styles.ButtonView} >
        <TouchableOpacity style = {styles.Button} onPress = {() => alldone() } >
          <Text>
            All Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#efefef',
    flex: 1
  },
  TodoInput: {
    borderWidth: 1,
    flex: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'white',
    elevation: 5,
    borderColor: '#ffffff'
  },
  InputView: {
    flexDirection: 'row'
  },
  AddIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  ListView: {
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    borderColor: '#ffffff',
    height: 45,
    flexDirection: 'row'
  },
  ListItem: {
    justifyContent: 'center',
    flex: 1,
  },
  ItemText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontStyle: 'italic'
  },
  ItemIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ButtonView:{
    alignItems:'flex-end'
  },
  Button:{
    backgroundColor:'white',
    height:50,
    width:150,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#ffffff',
    margin:5,
    elevation:5
  }
})