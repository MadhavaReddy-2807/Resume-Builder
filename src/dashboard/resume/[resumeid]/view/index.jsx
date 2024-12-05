import { Button } from '@/components/ui/button'
import Header from '@/components/ui/custom/header'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Resumeinfo } from '@/context/resumeinfo'
import Resumepreview from '../edit/components/resumepreview'
import { RWebShare } from 'react-web-share'

const View = () => {
    const handledownload = () => {
        window.print();
    }

    const params = useParams();

    useEffect(() => {
        const fetchResume = async () => {
            const res = await fetch(import.meta.env.VITE_SERVER_URL+`resumes?id=${params.resumeid}`);
            const data = await res.json();
            console.log(data);
            setResumeinfo(data);
        };

        fetchResume();
    }, [params.resumeid]);

    const [resumeinfo, setResumeinfo] = useState(null);
   const resumeid=resumeinfo?.id
    return (
        <Resumeinfo.Provider value={{ resumeinfo, setResumeinfo }}>
            <div>
                <div id='no-print'>
                    <Header />
                    <h2 className='font-medium text-2xl text-center mt-12'>
                        Congratulations! Your Ultimate AI generated Resume is ready!
                    </h2>
                    <p className='text-center text-gray-300'>
                        Now you are ready to download your resume and share it with your family and friends.
                    </p>
                    <div className='justify-between flex mt-3 px-20 md:px-44'>
                        <Button onClick={handledownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Check my resume",
                                url: import.meta.env.VITE_SERVER_URL+"dashboard"+"/resume/"+resumeid+"/view",
                                title: "Resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>

                <div className='md:px-40 mt-5' id="print-area">
                    <Resumepreview />
                </div>
            </div>
        </Resumeinfo.Provider>
    )
}

export default View;
