export type Product = { id: string; name: string; category: string; price: number; image: string; description: string; badge?: string };
export type CartItem = { key: string; productId: string; name: string; image: string; dough: string; addons: string[]; quantity: number; unitPrice: number; notes: string };
export type CakeBrief = { occasion: string; servings: number; flavor: string; filling: string; date: string; notes: string; inspiration: string; name: string; email: string; phone: string; files: { name: string; data: string }[] };
export const products: Product[] = [
 {id:'zaatar',name:'Premium Zaatar Manakish',category:'Manakish',price:2.5,image:'/images/flatbread.jpg',description:'Our signature zaatar blend, extra virgin olive oil, and a beautifully crisp edge.',badge:'The house favorite'},
 {id:'cheese',name:'Three-Cheese Manakish',category:'Manakish',price:4,image:'/images/pizza.jpg',description:'A generous blend of akkawi, mozzarella, and kashkaval on our hand-stretched dough.'},
 {id:'lahm',name:'Lahm bi Ajeen',category:'Manakish',price:4.5,image:'/images/pizza.jpg',description:'Spiced beef, ripe tomato, and a touch of pomegranate molasses.'},
 {id:'pizza',name:'Garden Lebanese Pizza',category:'Pizza',price:6,image:'/images/pizza.jpg',description:'House tomato sauce, mozzarella, olives, sweet peppers, and fresh herbs.',badge:'Fresh from the oven'},
 {id:'pepperoni',name:'Special Pepperoni Pizza',category:'Pizza',price:7,image:'/images/pizza.jpg',description:'Pepperoni, melting cheese, sweetcorn, and our house tomato sauce.'},
 {id:'croissant',name:'Butter Croissant',category:'Pastries',price:2.75,image:'/images/croissant.jpg',description:'Golden layers, cultured butter, and a delicate, shattering crunch.',badge:'Baked daily'},
 {id:'roll',name:'Chocolate Swirl',category:'Pastries',price:3.5,image:'/images/pastries.jpg',description:'Soft laminated pastry, dark chocolate, and a light dusting of sugar.'},
 {id:'cake',name:'Chocolate Ganache Slice',category:'Desserts',price:4.5,image:'/images/chocolate-cake.jpg',description:'Rich chocolate sponge, silky ganache, and a little everyday indulgence.'},
 {id:'cupcake',name:'Vanilla Cloud Cupcake',category:'Desserts',price:3.25,image:'/images/cupcakes.jpg',description:'Vanilla bean sponge with a generous swirl of light buttercream.'},
 {id:'coffee',name:'House Cappuccino',category:'Drinks',price:3,image:'/images/coffee.jpg',description:'A balanced espresso with silky steamed milk.'}
];
export const doughs=[{name:'White',price:0,note:'Our classic, soft & crisp'},{name:'Oat',price:.75,note:'Hearty with a gentle crunch'},{name:'Whole Wheat',price:.5,note:'Nutty, wholesome & rustic'}];
export const extras=[{name:'Extra Veg',price:1,note:'Tomato, cucumber, olives & mint'},{name:'Labneh on the side',price:1.5,note:'Creamy, tangy & made for dipping'},{name:'Extra Zaatar',price:.5,note:'A little more of our signature blend'}];
export const money=(value:number)=>`$${value.toFixed(2)}`;
export function unitPrice(product:Product,dough:string,addons:string[]) { return Math.round((product.price+(doughs.find(d=>d.name===dough)?.price||0)+extras.filter(e=>addons.includes(e.name)).reduce((s,e)=>s+e.price,0))*100)/100; }
export function cartKey(id:string,dough:string,addons:string[],notes:string) { return JSON.stringify([id,dough,[...addons].sort(),notes.trim()]); }
export function addCartItem(cart:CartItem[],incoming:CartItem) {const found=cart.find(item=>item.key===incoming.key);return found?cart.map(item=>item.key===incoming.key?{...item,quantity:Math.min(99,item.quantity+incoming.quantity)}:item):[...cart,incoming];}
export function subtotal(cart:CartItem[]) {return Math.round(cart.reduce((s,item)=>s+item.unitPrice*item.quantity,0)*100)/100;}
export function minimumCakeDate(today=new Date()) {const date=new Date(today.getFullYear(),today.getMonth(),today.getDate()+3);return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function cakeErrors(brief:CakeBrief,minDate:string) {const errors:Record<string,string>={};if(!brief.occasion)errors.occasion='Choose an occasion.';if(!brief.date||brief.date<minDate)errors.date='Choose a date at least 3 days from today.';if(!brief.name.trim())errors.name='Please add your name.';if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email))errors.email='Please enter a valid email address.';if(!brief.phone.trim())errors.phone='Please add a contact number.';return errors;}
