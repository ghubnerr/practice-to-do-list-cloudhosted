const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config()
const _ = require('lodash');
 
app.set('view engine', 'ejs');
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
 

mongoose.connect(process.env.SRV, {useNewUrlParser: true});
 
const itemsSchema = new mongoose.Schema({
  name: String
});

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model('List', listSchema);
 
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
    name: 'Welcome to your to-do list!'
})

const item2 = new Item ({
    name: 'Hit the + button to add a new item.'
})

const item3 = new Item ({
    name: '<-- Hit this to delete an item.'
})

defaultItems = [item1, item2, item3]

app.get("/", function(req, res) {

    Item.find({}).then((foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems)
            .then(function(){
                console.log("Successfully saved all the items to itemsDB");
            })
            .catch(function(err){
                console.log(err);
            });
            res.redirect('/')
        }
        res.render("list", {listTitle: "Today", newListItems: foundItems});
        })
        .catch((err)=>{
            console.log(err)
        })
 
});

app.get('/:listName', function(req,res) {
    const customListName = _.capitalize(req.params.listName);

    List.findOne({name: customListName}).then((foundList) => {
        if (!foundList){
            const newList = new List({
                name: customListName,
                items: defaultItems
            });
            newList.save()
            res.redirect('/'+customListName)
        } else {
            res.render('list', {listTitle: foundList.name, newListItems: foundList.items})
        }
    })
    


})
 
app.post("/", function(req, res){
 
  const itemName = req.body.nextItem;
  const listName = req.body.list;

  console.log(listName)

  const newItem = new Item({
    name: itemName
  })

  if (listName === "Today"){
    newItem.save();
    res.redirect('/');
  } else{
    List.findOne({name: listName}).then((foundList) => {
        foundList.items.push(newItem);
        foundList.save()
        res.redirect('/'+listName)
    });
  }
});

app.post('/delete', function(req,res){
    const checkedItemId = req.body.checkbox
    const listName = req.body.listName;

    if (listName === "Today"){
        Item.deleteOne({_id: checkedItemId}).then(()=>{
            console.log('Successfully deleted')
            res.redirect('/')
        })
        .catch((err)=>{
            console.log(err)
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull:{items: {_id: checkedItemId}}}).then(()=>{
            console.log('Successfully deleted inside list')
            res.redirect('/'+listName)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
})
 


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
