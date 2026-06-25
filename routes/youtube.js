import express from "express";

import {
google
}
from "googleapis";


const router =
express.Router();



const youtube =
google.youtube({

version:"v3",

auth:
process.env.YOUTUBE_API_KEY

});




router.get("/",async(req,res)=>{


try{


const query =
req.query.q;



const data =

await youtube.search.list({

part:"snippet",

q:query,

maxResults:10,

type:"video"

});



const result =

data.data.items.map(item=>({

id:item.id.videoId,


title:
item.snippet.title,


artist:
item.snippet.channelTitle,


image:
item.snippet.thumbnails.high.url,


audio:
`https://youtube.com/watch?v=${item.id.videoId}`


}));



res.json(result);



}

catch(error){


res.status(500).json({

error:"API Error"

});


}


});



export default router;
