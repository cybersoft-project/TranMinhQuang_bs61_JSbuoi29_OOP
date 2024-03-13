export default class listPerson {
    listPerson = [];
    addUser(user) {
        this.listPerson.push(user)
    }
    findUserIndex(id){
        for (const index in this.listPerson) {
            console.log(index);
            
            if (this.listPerson[index]?.id == id) {
                return index;                
            }
        }
    }
    deleteUser(index){
        this.listPerson.splice(index, 1);
    }
    updateUser(index, user){
        this.listPerson[index] = user;
        console.log(this.listPerson[index]);
        
    }

}