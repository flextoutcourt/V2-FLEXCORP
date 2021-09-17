import React, { Component } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5';
import axios from 'axios';

export default function New({auth, errors}){

    let autosave = (editor) => {
        console.log(editor.getData());
        axios.post(route('api.ckautosave'), {editor: editor.getData(), id: editor.id, user_id: auth.user.id})
        .then((data) => {
            console.log(data);
        })
    }

    function content(){
        return(
            <div>
                <CKEditor
                    editor={ ClassicEditor }
                    config={{
                        ckfinder: {
                            uploadUrl: route('api.ckupload'),
                        },
                        autosave: {
                            save(editor) {
                                autosave(editor);
                            },
                            waitingTime: 3000,
                        },
                        toolbar: {
                            items: [
                                'heading',
                                '|',
                                'bold',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                'horizontalLine',
                                '|',
                                'fontSize',
                                'fontColor',
                                'fontFamily',
                                'outdent',
                                'indent',
                                '|',
                                'uploadImage',
                                'imageResize',
                                'blockQuote',
                                'codeBlock',
                                'insertTable',
                                'mediaEmbed',
                                'undo',
                                'redo',
                                'todoList',
                            ]
                        },
                        // mention: {
                        //     feeds: [
                        //         {
                        //             marker: '@',
                        //             feed: ['Flex', 'Flexouille', 'FlexLaD'],
                        //             minimumCharacter: 1
                        //         }
                        //     ]
                        // },
                        image: {
                            toolbar: [
                                'imageStyle:inline',
                                'imageStyle:block',
                                'imageStyle:side',
                                'imageResize',
                                '|',
                                'toggleImageCaption',
                                'imageTextAlternative',
                            ]
                        },
                        table: {
                            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                        },
                        codeBlock: {
                            languages: [
                                {language: 'css', label: "CSS", class:"css"},
                                {language: 'javascript', label: "JavaScript", class: "js javascript js-code"},
                                {language: 'html', label: "HTML", class:"html"},
                                {language: 'php', label: "PHP", class:'php'},
                            ]
                        }
                    }}
                />
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Créer une actu</h2>}
            >
                {content()}
            </Authenticated>
        )
    }else{
        return (
            <Guest
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Dashboard</h2>}
            >
                {content()}
            </Guest>
        )
    }
    
}