import { NSAuthUser } from "@/src/auth/types";
import { APIResponse } from "@/src/common/utils/helpers";
import { db } from "@/src/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const LspAPI = {
  async getLspById(id: string) {
    const docRef = doc(db, "lsp", id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data()?.firstName === "") {
          throw new Error("LSP not found");
        }
        return APIResponse(false, "LSP found", docSnap.data());
      } else {
        throw new Error("No such document!");
      }
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },
  async getLSPS() {
    const q = query(collection(db, "lsp"), where("firstName", "!=", ""));
    const lsps: any = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lsps.push({
        ...(doc.data() || {}),
        id: doc.id,
      });
    });
    return APIResponse(true, "LSPs found", lsps);
  },
  async requestLSP({
    customer,
    lsp,
    subject,
    description,
  }: {
    customer: NSAuthUser.TCustomer;
    lsp: NSAuthUser.TUser;
    subject: string;
    description: string;
  }) {
    "use server";

    const collectionRef = collection(db, "requests");
    try {
      await addDoc(collectionRef, {
        lsp,
        customer,
        subject,
        description,
        status: "PENDING",
        createdAt: new Date().toString(),
      });
      if (!lsp?.firstName) {
        throw new Error("LSP not found");
      }
      return APIResponse(false, "Request Added", null);
    } catch (err: any) {
      return APIResponse(true, err.message, null);
    }
  },
  // There can be at max only one pending request of one customer to one lsp
  async getRequestsByStatusOfCustomerToLSP(
    customerId: string,
    lspId: string,
    status: NSAuthUser.TRequest["status"] = "PENDING"
  ) {
    "use server";
    try {
      const q = query(
        collection(db, "requests"),
        where("customer.id", "==", customerId),
        where("lsp.id", "==", lspId),
        where("status", "==", status),
        limit(1)
      );

      const docs = await getDocs(q);
      const requests: any = [];
      docs.forEach((doc) => {
        requests.push({
          ...(doc.data() || {}),
          id: doc.id,
        });
      });
      if (requests.length > 0) {
        return APIResponse(false, "Request found", requests);
      }
      return APIResponse(false, "No request found", null);
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },
  async getAllRequestsByUser(customerId: string) {
    "use server";
    try {
      const q = query(
        collection(db, "requests"),
        where("customer.id", "==", customerId)
      );

      const docs = await getDocs(q);
      const requests: any = [];
      docs.forEach((doc) => {
        requests.push({
          ...(doc.data() || {}),
          id: doc.id,
        });
      });
      if (requests.length > 0) {
        return APIResponse(false, "Request found", requests);
      }
      return APIResponse(false, "No request found", null);
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },
  async cancelPendingRequest(reqId: string) {
    "use server";
    try {
      const docRef = doc(db, "requests", reqId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.status === "PENDING") {
          await updateDoc(docRef, {
            status: "REJECTED",
          });
          return APIResponse(false, "Request Cancelled", null);
        } else {
          throw new Error("Request is not pending");
        }
      } else {
        throw new Error("No such document!");
      }
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },
  async deleteCancelledReq(reqId: string) {
    "use server";
    try {
      const docRef = doc(db, "requests", reqId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.status === "REJECTED") {
          await deleteDoc(docRef);
          return APIResponse(false, "Request Deleted", null);
        } else {
          throw new Error("Request cannot be deleted");
        }
      } else {
        throw new Error("No such document!");
      }
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },
};

export default LspAPI;
