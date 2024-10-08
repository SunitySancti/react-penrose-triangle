/*
 * Copyright (C) 2024 Alex Sunity
 *
 * This file is part of react-penrose-triangle.
 *
 * react-penrose-triangle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * react-penrose-triangle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with react-penrose-triangle. If not, see <https://www.gnu.org/licenses/>.
 */

import { observer } from 'mobx-react-lite'
import PenroseTriangle from './PenroseTriangle/index.js'
import { usePenroseTriangle,
         defaultValues } from './store/index.js'

export {
    observer,
    PenroseTriangle,
    usePenroseTriangle,
    defaultValues
}

export default PenroseTriangle
