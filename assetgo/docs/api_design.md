# ASSET-GO! 財產管理系統 - API設計文件

## **API介紹**
這份文件定義了 ASSET-GO! 的 API介面，前端可以透過這些API跟GS進行互動。
所有 API 皆回應 **JSON格式**，請求時確認 `Content-Type: application/json`。

| API 方法 | HTTP 方法 | 路徑 | 說明 |
|----------|----------|------|------|
| 取得所有資產 | GET | `/getAllAssets` | 取得完整資產清單 |
| 取得單一資產 | GET | `/getAssetInfo?assetId=ASSET001` | 取得特定資產資訊 |
| 新增資產 | POST | `/addAsset` | 新增資產到Google Sheets |
| 更新資產 | PATCH | `/updateAsset` | 修改資產資訊 |
| 刪除資產 | DELETE | `/deleteAsset/ASSET0001` | 刪除指定資產 | 
| 取得所有分類 | GET | `/getCategories` | 取得可用的分類清單 |
| 新增分類 | POST | `/addCategory` | 新增分類 |
| 刪除分類 | DELETE | `/deleteCategory?category="電子設備"` | 刪除指定分類 |
