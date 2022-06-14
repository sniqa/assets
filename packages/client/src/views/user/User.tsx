import { Button, Dialog } from '@mui/material'
import { Row } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { UserInfoWitId } from '@assets/types'
import Table, { createTableInstance, createRowSelection, type TableToolbarExtensions } from '../../comps/table'
import { _fetch } from '../../apis/fetch'
import { useAppDispatch, useAppSelector } from '../../store'
import { notice } from '../../apis/mitt'
import { addUser, deleteManyUser, setUsers, updateUser } from '../../store/user'
import AddIcon from '@mui/icons-material/Add'
import UserDetail from './UserDetail'

const USER_DETAIL_EDIT_INDEX = 2
const USER_DETAIL_ADD_INDEX = 3

const table = createTableInstance<UserInfoWitId>()

const User = () => {
	const users = useAppSelector((state) => state.users)

	const dispatch = useAppDispatch()

	// 根据index的值去显示对应的页面
	const [itemMapIndex, setItemMapIndex] = useState(0)

	const [curUserDetailInfo, setCurUserDetailInfo] = useState<UserInfoWitId>({})

	const onUserDetail = (index: number, userInfo: UserInfoWitId) => {
		setCurUserDetailInfo(userInfo)
		setItemMapIndex(index)
	}

	const columns = useMemo(
		() => [
			table.createDisplayColumn(createRowSelection()),
			table.createDataColumn('username', {
				header: () => <span className="">{`用户名`}</span>,
			}),
			table.createDataColumn('nickname', {
				header: () => <span className="pl-2">{`昵称`}</span>,
				cell: (info) => info.getValue() || '',
			}),
			table.createDataColumn('department', {
				header: () => <span className="pl-2">{`部门`}</span>,
				cell: (info) => info.getValue() || '',
			}),
			table.createDataColumn('number', {
				header: () => <span className="pl-2">{`工号`}</span>,
				cell: (info) => info.getValue() || '',
			}),
			table.createDisplayColumn({
				id: 'opration',
				header: () => <span className="pl-2">{`操作`}</span>,
				cell: (info) => (
					<div className="">
						<Button onClick={() => onUserDetail(USER_DETAIL_EDIT_INDEX, info.row.original || {})}>编辑</Button>
						<Button></Button>
					</div>
				),
			}),
		],
		[]
	)

	const addUserCallback = async (data: Partial<UserInfoWitId>) => {
		const { createUser } = await _fetch({ createUser: data })

		if (createUser.success) {
			dispatch(addUser(createUser.data))

			return notice({
				status: 'success',
				message: '创建用户成功',
			})
		}

		notice({
			status: 'error',
			message: createUser.errMsg,
		})
	}

	const deleteSelectUser = async (rows: Row<any>[]) => {
		const data = rows.map((row) => row.original)

		const { deleteUsers } = await _fetch({ deleteUsers: data })

		if (deleteUsers.success) {
			dispatch(deleteManyUser(data))

			return notice({
				status: 'success',
				message: '删除成功',
			})
		}

		notice({
			status: 'error',
			message: '删除失败',
		})
	}

	const modifyUser = async (data: Partial<UserInfoWitId>) => {
		const { modifyUser } = await _fetch({ modifyUser: data })

		if (modifyUser.success) {
			dispatch(updateUser(modifyUser.data))

			return notice({
				status: 'success',
				message: '修改成功',
			})
		}

		notice({
			status: 'error',
			message: '修改失败',
		})
	}

	const extensions: TableToolbarExtensions = useMemo(
		() => [
			{
				title: '添加用户',
				icon: <AddIcon color="primary" />,
				onClick: () => onUserDetail(USER_DETAIL_ADD_INDEX, {}),
			},
		],
		[]
	)

	useEffect(() => {
		const fetchUser = async () => {
			const { findUser } = await _fetch({ findUser: {} })

			findUser.success && dispatch(setUsers(findUser.data))
		}

		users.length === 0 && fetchUser()
	}, [])

	return (
		<div className="flex flex-grow bg-light-50 w-full h-full overflow-auto">
			<Table
				table={table}
				columns={columns}
				data={users}
				toolbar={{
					deleteSelection: deleteSelectUser,
					leftExtensions: extensions,
				}}
			/>

			{/* 操作栏 */}
			<div className="">
				{(() => {
					switch (itemMapIndex) {
						case USER_DETAIL_EDIT_INDEX:
							return (
								<UserDetail
									title="编辑用户"
									open={itemMapIndex === USER_DETAIL_EDIT_INDEX}
									close={() => setItemMapIndex(0)}
									onClick={(userInfo) => modifyUser(userInfo)}
									userInfo={curUserDetailInfo}
								/>
							)
						case USER_DETAIL_ADD_INDEX:
							return (
								<UserDetail
									title="添加用户"
									open={itemMapIndex === USER_DETAIL_ADD_INDEX}
									close={() => setItemMapIndex(0)}
									onClick={(userInfo) => addUserCallback(userInfo)}
								/>
							)
						default:
							return <div className=""></div>
					}
				})()}
			</div>
		</div>
	)
}

export default User
