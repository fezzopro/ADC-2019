class WayFarer{
    constructor(){
        this.userId = null;
    }
    add(a, b){
        return a+b;
    }
    signin(username, password){
        if (username == 'fezzopro@gmail.com' && password == 'Afrodis1') {
            return true;
        }else{
            return false;
        }
    }
    signup(data){
        // let [firstname,lastname,email,dob,username,password,rpassword] = data;
        return data;
    }
    createTrip(params = []){}
    cancelTrip(userId = this.userId, tripId){}
    viewTrip(userId = this.userId, tripId=all){}
    BookTrip(userId = this.userId, params = []){}
    viewBooking(userId = this.userId, bookingId = all){}
    deleteBooking(userId = this.userId, bookingId){}
    logout(userId){
        this.userId = userId;
        console.log(this.userId);
        console.log(this.userId = 0);
        console.log(this.userId);
    }
}
// console.log()
module.exports = new WayFarer();