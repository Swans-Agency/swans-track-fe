import React from "react";
import { Table } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

export default function Calender(props) {
  const dataSource = [
    {
      key: "1",
      SU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>1</h1>
        </div>
      ),
      MO: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>2</h1>
        </div>
      ),
      TU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>3</h1>
        </div>
      ),
      WE: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>4</h1>
        </div>
      ),
      TH: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>5</h1>
        </div>
      ),
      FR: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>6</h1>
        </div>
      ),
      ST: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>7</h1>
        </div>
      ),
    },
    {
      key: "2",
      SU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>8</h1>
        </div>
      ),
      MO: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>9</h1>
        </div>
      ),
      TU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>10</h1>
        </div>
      ),
      WE: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>11</h1>
        </div>
      ),
      TH: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>12</h1>
        </div>
      ),
      FR: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>13</h1>
        </div>
      ),
      ST: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>14</h1>
        </div>
      ),
    },
    {
      key: "3",
      SU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>15</h1>
        </div>
      ),
      MO: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>16</h1>
        </div>
      ),
      TU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>17</h1>
        </div>
      ),
      WE: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>18</h1>
        </div>
      ),
      TH: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>19</h1>
        </div>
      ),
      FR: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>20</h1>
        </div>
      ),
      ST: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>21</h1>
        </div>
      ),
    },
    {
      key: "4",
      SU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>22</h1>
        </div>
      ),
      MO: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>23</h1>
        </div>
      ),
      TU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>24</h1>
        </div>
      ),
      WE: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>25</h1>
        </div>
      ),
      TH: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>26</h1>
        </div>
      ),
      FR: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>27</h1>
        </div>
      ),
      ST: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>28</h1>
        </div>
      ),
    },
    {
      key: "5",
      SU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>29</h1>
        </div>
      ),
      MO: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>30</h1>
        </div>
      ),
      TU: (
        <div className="border-2 text-center border-black px-3 py-2  rounded-full hover:text-blue-400 hover:border-blue-400 ">
          <h1>31</h1>
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "SU",
      dataIndex: "SU",
      key: "SU",
    },
    {
      title: "MO",
      dataIndex: "MO",
      key: "MO",
    },
    {
      title: "TU",
      dataIndex: "TU",
      key: "TU",
    },
    {
      title: "WE",
      dataIndex: "WE",
      key: "WE",
    },
    {
      title: "TH",
      dataIndex: "TH",
      key: "TH",
    },
    {
      title: "FR",
      dataIndex: "FR",
      key: "FR",
    },
    {
      title: "ST",
      dataIndex: "ST",
      key: "ST",
    },
  ];

  return (
    <div>
      <div className="flex gap-2">
        <h1 className="pb-10 ps-5 font-semibold -tracking-tighter">August</h1>
        <LeftOutlined />
        <RightOutlined />
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}
