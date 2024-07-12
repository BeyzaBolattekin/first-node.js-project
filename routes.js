const fs = require('fs');


const requestHandler= (req, res)=>{
    const url= req.url;
    const method= req.method;
    if(url === '/'){
        res.write('<html>')
        res.write('<head> <title>Form Page</title></head>')
        res.write('<body> <form action="/message" method="POST"> <input type="text" name="message"> <button type="submit">Send</button> </form> </body> ') // buradaki form action veriyi /message yoluna POST yöntemiyle gönderir.
        res.write('</html>')
        return res.end(); // alt satirdan devam etmemesi icin
    }
    
    if(url === '/message' && method === 'POST'){
        const body=[]
        req.on('data', (chunk)=>{ 
            body.push(chunk)  // burada data yi alip body e eklerken key ve karsilik gelen datayi alarak yazar yani bizim kodumuzda inputun adi message oldugundan mesaage=girilmis input olarak yazar
        })
    
        return req.on('end',()=>{  // buraya return yazmazsam alttaki kodlardan sonra calisio ve response degistirilemeden coktan gonderilmis oluyo
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split("=")[1];  // yukarida yazdigim sebeplerden dolayi keyi degil de direkt mesaji almak icin 
            fs.writeFile('message.txt', message , ()=>{  // writeFileSync yazarsak bu satir gerceklesene kadar alt satirlari calistirmio o sebeple hem alti kitlememek hem de bu gerceklesirse gerceklesecek olaylari bu sekilde yazariz
                //alttaki satirlarin dosya olusturulursa calismasini istedigim icin boyle icine yazdim. bu ozelligi error icin fonksiyon yazmak icin kullanabilirsin
                res.statusCode = 302;  
                res.setHeader('Location', '/');
            return res.end(); // bu satirdan sonra devam etmemesi icin error veriyo yoksa
            }); 
            
        })
    }
        
    res.setHeader("Content-Type", "text/html")
    res.write('<html>')
    res.write('<head> <title>First Project</title></head>')
    res.write('<body> <h1>My First Node.js Project yayyy!</h1> </body> ')
    res.write('</html>')
    res.end()
}

module.exports = requestHandler;