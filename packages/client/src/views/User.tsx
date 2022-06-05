import { Button } from '@mui/material'
import { Row } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Table, { createCuzomTable, createRowSelection } from '../comps/table'
import { _fetch } from '../apis/fetch'
import { useAppDispatch, useAppSelector } from '../store'
import { notice } from '../apis/mitt'
import { addUser, deleteManyUser, setUsers } from '../store/user'

interface UserInfo {
	username: string
	nickname?: string
	department?: string
	number?: number
	test?: string
}

const table = createCuzomTable<UserInfo>()

const User = () => {
	const users = useAppSelector((state) => state.users)

	const dispatch = useAppDispatch()

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
						<Button>编辑</Button>
						<Button></Button>
					</div>
				),
			}),
		],
		[]
	)

	const addUserCallback = async (data: Partial<UserInfo>) => {
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

	useEffect(() => {
		const fetchUser = async () => {
			const { findUser } = await _fetch({ findUser: {} })

			findUser.success && dispatch(setUsers(findUser.data))
		}

		fetchUser()
	}, [])

	return (
		<div className="flex flex-grow bg-light-50">
			<Table
				table={table}
				columns={columns}
				data={users}
				addDate={addUserCallback}
				deleteSelection={deleteSelectUser}
			/>
		</div>
	)
}

export default User
