for(i=1;i<=5;i++){
    str=' '
    for(j=1;j<=i;j++){
        str+='*'
    }
    console.log(str);
}
for(i=1;i<=10;i++){
    console.log("5*"+i+"="+(5*i));
}
let n=143;
let num=0;
let mul=1;
while(n!=0){
    a=n%10;
    num+=(mul*a);
    mul*=10;
    n/=10;
    console.log(num);
}
console.log(num);