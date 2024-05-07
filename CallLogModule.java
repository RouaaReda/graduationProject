
import android.database.Cursor;
import android.provider.CallLog.Calls;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;


public class CallLogModule extends ReactContextBaseJavaModule {

    public CallLogModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CallLogModule";
    }

    @ReactMethod
    public WritableArray getCallLogs(int limit) {
        WritableArray callLogsArray = Arguments.createArray();
        
        // Querying call logs
        Cursor cursor = null;
        try {
            cursor = getReactApplicationContext().getContentResolver().query(
                Calls.CONTENT_URI, // The content URI for the call logs table
                null, // Projection: null returns all columns
                null, // Selection: null returns all rows
                null, // SelectionArgs: none
                Calls.DATE + " DESC" + (limit > 0 ? " LIMIT " + limit : "") // Sorting order and limit
            );

            if (cursor != null && cursor.moveToFirst()) {
                do {
                    WritableMap callLog = Arguments.createMap();
                    // Extracting call log data
                    String number = cursor.getString(cursor.getColumnIndex(Calls.NUMBER));
                    String name = cursor.getString(cursor.getColumnIndex(Calls.CACHED_NAME));
                    String type = cursor.getString(cursor.getColumnIndex(Calls.TYPE));
                    long date = cursor.getLong(cursor.getColumnIndex(Calls.DATE));

                    // Adding call log data to WritableMap
                    callLog.putString("phoneNumber", number);

                    callLog.putInt("type", Integer.parseInt(type));
                    callLog.putDouble("timestamp", date);

                    // Adding call log to WritableArray
                    callLogsArray.pushMap(callLog);
                } while (cursor.moveToNext());
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
        
        return callLogsArray;
    }
}
