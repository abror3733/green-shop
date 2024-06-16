"use client"
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import axios from 'axios';

interface TagType {
  id: string;
  title: string;
}

interface PropsType {
  setTagId: (key: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCategoryId: (key: string) => void;
  setSizeId: (key: string) => void;
}

const CustomTabs: React.FC<PropsType> = ({ setTagId, setIsLoading, setCategoryId, setSizeId }) => {
  const onChange = (key: string) => {
    setIsLoading(true)
    setCategoryId("");
    setSizeId("")
    setTimeout(() => {
      setTagId(key);
    }, 500);
  };

  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3001/tag-navbar`).then(res => {
      setItems(res.data.map((item: TagType) => ({ key: item.id, label: item.title })));
    })
  }, [])

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}

export default CustomTabs;