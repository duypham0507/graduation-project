import { Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { createTag, getTag } from "services/tag";

export const ListTagScreen = () => {
  const [form] = Form.useForm();
  const [listTag, setListTag] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getListTag();
  }, []);

  const getListTag = async () => {
    await getTag().then((rs) => {
      setListTag(rs.data.data);
    });
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      let param = {
       tags: [
          {
            tag_name: values.tag_name,
            tag_description: values.tag_description,
          },
        ],
      }
      await createTag(param)
      message.success('Thêm mới thành công');
      form.resetFields();
      setOpenModal(false);
      getListTag();
    } catch (err:any) {
      console.log(err?.response?.data?.message);
      
      message.error(err?.response?.data?.message!);
    }
  }

  return <div className="w-full h-full flex flex-col flex-grow-limit mt-2">
    <div className="flex flex-row justify-between items-center pl-3 pr-6">
      <span className="text-xl text-baseGray-100 font-semibold">
        Danh sách thẻ tag
      </span>
      <button onClick={() => setOpenModal(true)} className="border flex flex-row px-4 py-2 items-center rounded-sm h-8 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500">
        <span className="text-lg">Thêm thẻ mới</span>
      </button>
    </div>
    <div className="scrollable-view pb-20 gap-y-4 mt-6 h-full">
      {listTag && listTag.map((item, index) => <div key={index} className="w-full cursor-pointer bg-transparent hover:bg-gray-100 relative px-3 py-2">
        <div className="flex flex-row space-x-4 items-start">
          <div className="flex flex-col w-11/12 text-left mb-2">
            <span className="line-clamp-1 text-base text-left font-semibold ">{item.tag_name}</span>
            <span className="line-clamp-1 text-sm text-left text-gray-500">{item.tag_description}</span>
          </div>
        </div>
      </div>)}
    </div>
    <Modal
      open={openModal}
      title="Thêm thẻ tag"
      okText="Thêm mới"
      okType="default"
      onOk={handleSubmitForm}
      onCancel={() => setOpenModal(false)}
      cancelText="Hủy"
      closable={false}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên thẻ tag"
          name="tag_name"
          rules={[{ required: true, message: 'Bạn chưa nhập tên tag' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
            label="Mô tả"
            name="tag_description"
            rules={[{ required: true, message: "Chưa nhập mô tả" }]}
            style={{ width: "100%" }}
            labelCol={{ span: 24 }}
          >
            <TextArea rows={4} placeholder="Tag description" />
          </Form.Item>
      </Form>
    </Modal>
  </div>;
};
