import React, {useState, useEffect} from 'react'
import parse from 'html-react-parser';
import ReactTooltip from 'react-tooltip';
import { backgroundImage } from 'tailwindcss/defaultTheme';

export default function Tweets({tweets, quoted_status = null}) {

    

    const replace_entities = (item) => {
        item.entities.user_mentions.map((mention, key) => {
            item.text = item.text.replace('@'+mention.screen_name, `<a href="https://twitter.com/u/${mention.id}" data-tip="${mention.name}" target="_blank" className="text-indigo-500">${mention.name}</a>`);
        })
        item.entities.urls.map((url, key) => {
            item.text = item.text.replace(url.url, `<a href="${url.expanded_url}" target="_blank" className="text-indigo-500">${url.url}</a>`)
        })
        item.entities.hashtags.map((hashtag, key) => {
            item.text = item.text.replace('#'+hashtag.text, `<a href="https://twitter.com/hashtag/${hashtag.text}" target="_blank" className="text-indigo-500">#${hashtag.text}</a>`)
        })
        if(item.extended_entities){
            if(item.extended_entities.media){
                let html = `<div className="grid grid-cols-2 gap-1">`
                    {item.extended_entities.media.map((ext_media, key) => {
                        item.text = item.text.replace(ext_media.url, '  ');
                        html += '<div className="h-32" style="background-image: url('+ext_media.media_url+'); background-size: cover; background-position: center center; background-repeat: no-repeat"></div>'
                        //  `<img className="w-full" src="${}"/>`;
                    })}
                html += `</div>`;
                item.text += html;
            }
        }
        // item.text = '<script>console.log("testtgfkjsghfdkjghlskfghkls")</script>';
        return item;
    }

    const Tweet = (item) => {
        
    }


    return (
        <div className="flex flex-col gap-2">
            {quoted_status
            ?
                <div className="bg-gray-900 border border-gray-800 mt-2 p-2 rounded-md shadow-md text-white">
                    {parse(replace_entities(quoted_status).text)}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="rt">
                            <i className="fas fa-retweet"></i>
                            <span className="ml-2">{quoted_status.retweet_count}</span>
                        </div>
                        <div className="like">
                            <i className="fas fa-heart"></i>
                            <span className="ml-2">{quoted_status.favorite_count}</span>
                        </div>
                    </div>
                </div>
            :
                tweets.map((item, key) => (
                    <div key={key} className="bg-gray-900 p-2 rounded-md shadow-md text-white">
                        {parse(replace_entities(item).text)}
                        {item.is_quote_status
                            ?
                                <Tweets quoted_status={item.quoted_status} />
                            :
                                null
                        }
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="rt">
                                <i className="fas fa-retweet"></i>
                                <span className="ml-2">{item.retweet_count}</span>
                            </div>
                            <div className="like">
                                <i className="fas fa-heart"></i>
                                <span className="ml-2">{item.favorite_count}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            <ReactTooltip/>  
        </div>
    )
}
