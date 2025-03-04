# ASSET-GO! 財產管理系統 - 需求文件

## **1. 目標**
系統旨在提供無伺服器的財產解決方案
透過 **Vue.js 前端** + **Google Apps Script 後端API**，讓使用者能夠：
- 透過 Google Sheets 儲存財產資訊
- 掃描 QR Code 查找財產資訊
- 支援 Google OAuth 登入，確保安全性。
- 新增 / 編輯 / 刪除財產
- 管理財產分類

## **2. 使用者角色**
| 角色 | 權限 |
|------|------|
| 一般使用者 | 可查詢資產，掃描 QR Code | 
| 管理員 | 可新增 / 修改 / 刪除資產，管理分類 |

## **3. 功能需求**
- [ ] Vue 3 + Vite 開發前端
- [ ] Google Apps Script 設定 API
- [ ] 取得資產清單 API
- [ ] 新增 & 編輯資產
- [ ] Google OAuth 身份驗證

## **4. 進階功能**
- [ ] 分類管理功能（允許管理員編輯分類）
- [ ] QR Code 掃描功能（掃描後顯示財產資訊）
- [ ] 優化 UI & 效能

## **5. 資料庫設計（Google Sheets結構）**
| 欄位 | 說明 |
|------|------|
| A - 財產編號 | 唯一 ID，例如 `ASSET0001` |
| B - 財產名稱 | 例如 `筆電`、`辦公桌` |
| C - 當前使用者 | 使用此財產的人 |
| D - 存放位置 | 財產的所在地，例如 `會議室` |
| E - 狀態 | 例如 `正常`、`維修中`、`報廢` |
| F - 條碼 | QR Code 對應的財產編號 |
| G - 變更時間 | 最後更新時間 |
| H - 分類 | 例如 `電子設備`、`家具` |

## **6. 系統流程**
### **1. 一般使用者流程**
1. 使用者透過 Google OAuth 登入系統
2. 進入資產管理介面，可瀏覽財產清單
3. 使用者可以**掃描QR Code**查找財產資訊

### **2. 管理員流程**
1. 管理者登入後，進入管理面板
2. 可 ** 新增 / 修改 / 刪除 ** 財產資訊
3. 可 ** 修改分類 ** ，為財產設定分類

## **7. API需求**
| API | Method | 參數 | 回傳值 |
|-----|--------|------|--------|
| `/getAssetInfo` | GET | `assetId` | `{ assetId, assetName, user, location, status, category }` |
| `/updateAssetInfo` | POST | `assetId, assetName, user, location, status, category` | `{ message: \"更新成功\" }` |
| `/getNextAssetId` | GET | 無 | `{ nextAssetId: \"ASSET0005\" }` |
| `/auth/google` | POST | `idToken` | `{ success: true, userEmail }` |
