import React from 'react'
import { Upload } from 'lucide-react'
import { useCSVReader   } from "react-papaparse"
import { Button } from '@/components/ui/button';
import { get } from 'http';

type Props = {
    onUpload: (results: any) => void;
}

function UploadButton(
    {
        onUpload
    } : Props
) {
    const { CSVReader} = useCSVReader();

    //TODO: Add a paywall
  return (
    <CSVReader onUploadAccepted={onUpload}>
        {({ getRootProps }: any) => (
            <Button
             size={'sm'}
             className='w-full lg:w-auto border-blue-600'
             {...getRootProps()}
             variant={'outline'}
            >
                <Upload className='size-4 mr-2'/>
                Import CSV
            </Button>
        )}
    </CSVReader>
  )
}

export default UploadButton