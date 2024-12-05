import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ResumeCard = ({ resume }) => {
  const navigate = useNavigate();

  const edit = () => {
    navigate(`/dashboard/resume/${resume.id}/edit`);
  };

  const view = () => {
    navigate(`/dashboard/resume/${resume.id}/view`);
  };

  const deleteresume = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER_URL+"resumes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: resume.id,
      })
    });
    //  console.log('done');
    if(res.ok)
    {
      window.location.reload();
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-between border-t-blue-500 border-t-8 rounded border-b-[25px] border-b-blue-500 mt-5 h-[300px] w-[250px] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      {/* Card Content */}
      <Link to={`/dashboard/resume/${resume.id}/edit`} className="flex-grow flex flex-col items-center justify-center">
        <div className="card h-24 w-64 relative">
          {/* Placeholder for the resume preview or image */}
        </div>
      </Link>

      {/* Resume Title and Dropdown at the Bottom */}
      <div className="flex flex-row items-center justify-between w-full px-4 mt-auto -mb-6">
        <span className="text-white font-serif">{resume.resumetitle}</span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-4 cursor-pointer text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={edit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={view}>View</DropdownMenuItem>
            <DropdownMenuItem onClick={view}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={deleteresume}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ResumeCard;
