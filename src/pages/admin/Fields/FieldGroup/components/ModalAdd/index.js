import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCreateFieldGroupMutation } from "~/hooks/api/mutations/admin/admin.fieldGroup.mutation";
import { setLoading } from "~/redux/slides/GlobalApp";

function ModalAdd({ setOpenModal, getAllFieldGroup}) {
  const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [msgValidate, setMsgValidate] = useState('');
    useEffect(() => {
      if (input.trim().length === 0) {
        setMsgValidate('Vui lòng nhập đầy đủ thông tin.')
      } else {
        setMsgValidate('')
      }
    }, [input])
    const addFiledGroup = useCreateFieldGroupMutation();
    const handleSave = async () => {
      if (input.trim().length > 0) {
        dispatch(setLoading(true));
        addFiledGroup.mutate(
          { name: input },
          {
            onSuccess: (res) => {
              getAllFieldGroup();
              dispatch(setLoading(false));
              setOpenModal(false);
              toast.success("Thêm mới thành công.")
            },
            onError: (error) => {
              console.log('error', error);
            },
            onSettled: () => {
              dispatch(setLoading(false));
            },
          },
        );
      }
    }
  return (
    <div className="fixed inset-0 z-[2000] flex justify-center bg-black bg-opacity-50" onClick={() => setOpenModal(false)}>
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-8 mt-[100px] h-fit" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-[20px] font-medium">Thêm mới nhóm lĩnh vực</h2>
          <button onClick={() => {}} className="p-2 hover:bg-gray-200 rounded-full">
            <IoMdClose size={20} onClick={() => setOpenModal(false)}/>
          </button>
        </div>

        <div className="mt-10 p-5">
          <label className="block text-[14px] font-medium text-gray-500">Nhập nhóm lĩnh vực:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full mt-2 p-3 rounded-md'
            style={{
                border: "2px solid #ccc",
            }}
            placeholder="Nhập nhóm lĩnh vực"
          />
          {msgValidate.trim().length > 0 && <label className="text-[10px] text-red-500 mt-2">{msgValidate}</label>}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className={`px-4 py-2 bg-[#7a69b3] text-white font-medium rounded-md hover:opacity-90 hover:cursor-pointer ${input.trim().length === 0 && "opacity-10 hover:opacity-10"}`}
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAdd