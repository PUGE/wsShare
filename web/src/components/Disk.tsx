import React, { useCallback } from 'react';
import {FaPlus, FaFile } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { StateType } from '../reducers';
import { fileServer } from '../config';

interface DiskProps {
}

const Disk: React.FC<DiskProps> = ({}) => {
  const fileList = useSelector((store: StateType) => store.fileList);
  const onDrop = useCallback(
    (files: File[]) => {
      var data = new FormData();
      console.log(files)
      data.append("file", files[0]);
      
      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "http://82.157.168.130:5001/upload");

      xhr.send(data);
    },
    []
  );
  const onClick = useCallback(() => {
    console.log('sdsdsd')
  }, []);
  
  const {getInputProps } = useDropzone({
    onDrop,
  });
  return (
    <div className={'subsection disk'}>
      {fileList.map(fileName => (
        <a className={'file-item'} href={fileServer + fileName}>
          <FaFile/>
          <div>{fileName}</div>
        </a>
        
      ))}
      <div className={'add file'} onClick={onClick}>
        <input
          {...getInputProps({
            style: {},
          })}
          accept={'*'}
          tabIndex={1}
        />
        <FaPlus />
      </div>
      
    </div>
  );
};

export default Disk;
